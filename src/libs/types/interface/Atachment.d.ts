type Attachment = {
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'xls';
  size: number;
  key: string;
  localPath?: string;
};
