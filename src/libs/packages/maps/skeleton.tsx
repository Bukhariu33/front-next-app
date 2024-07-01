import { Skeleton } from '@mantine/core';

import styles from './skeleton.module.css';

function MapSkeleton() {
  return (
    <div className={styles['skeleton-container']}>
      <Skeleton className={styles['skeleton-image']} h={500} />
    </div>
  );
}

export default MapSkeleton;
