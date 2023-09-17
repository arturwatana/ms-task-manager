export type TaskUserRequestDTO = {
  userId: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA';
};

export type TaskUserRequestWithoutUserId = Omit<TaskUserRequestDTO, 'userId'>;

export type TaskUserResponseDTO = {
  id: string;
};

export type TaskDTO = {
  startAt: Date;
  endAt: Date;
  title: string;
  description: string;
};

export type UserDTO = {
  id: string;
  username: string;
  name: string;
  password: string;
  avatarUrl: string | null;
  createdAt: Date;
  email: string;
};

export type TaskUserNotificationDTO = {
  id: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  task: TaskDTO;
  user: UserDTO;
};
