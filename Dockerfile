# STAGE 1: A container with pnpm and python3 is required
FROM node:18-alpine as base

WORKDIR /app
# install pnpm
RUN npm i --global --no-update-notifier --no-fund pnpm
# install python3 and other deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache g++ make py3-pip libc6-compat

# STAGE 2: fetch deps into the pnpm store
# We run pnpm fetch in a separate step to avoid re-fetching deps on every code change
# fetch is a pnpm command that downloads all dependencies to the local store
# You could remove or skip this step if using npm or yarn (but make sure to copy your lock file)
FROM base as fetched_deps
WORKDIR /app
# copy the lock file that you use
COPY pnpm-lock.yaml ./
# set the store dir to a folder that is not in the project
RUN pnpm config set store-dir /workdir/.pnpm-store
RUN pnpm fetch

# STAGE 3: Copy the application code and install all deps from cache into the application
FROM fetched_deps as with_all_deps
# I use mono repo so I copy the whole project code (except for ignored things)
COPY . ./
# finally, install all the deps
RUN pnpm install --frozen-lockfile

# STAGE 4: Build the NextJS app
FROM with_all_deps as builder
RUN pnpm format
RUN pnpm build

# STAGE 5: Create a clean production image - only take pruned assets
FROM node:18-alpine AS runner
WORKDIR /app
# We add a non-root user to run the app for security reasons
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app

# We copy the built NextJS app assets from the builder stage
# NextJS produces a app
COPY --chown=app:app --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=app:app --from=builder /app/.next/standalone ./
COPY --chown=app:app --from=builder /app/.next/static ./.next/static

ENV HOSTNAME localhost

CMD ["node", "server.js"]
