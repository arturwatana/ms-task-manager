export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export type FileDTO = {
  fieldName: string;
  originalname: string;
  encoding: string;
  mimeType: string;
  buffer: Buffer;
  size: number;
};

export type AvatarDTO = {
  idUser: string;
  file: FileDTO;
};
