import { registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
  READY,
  IN_PROGRESS,
  DONE,
  REJECTED
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});