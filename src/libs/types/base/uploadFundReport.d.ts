export type UploadProps = {
  fundId: string;
  attachments: Attachment[];
};

export type UploadReport = {
  id: string;
  fundId: string;
  reportSharingDate: string;
  reportFileUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type APIResponseUploadReport = APIResponse<UploadReport>;
