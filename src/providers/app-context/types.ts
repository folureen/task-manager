
export type TaskComment = {
    id: string;
    userId: string;
    commentText: string;
    timestamp: string;
    name: string;
}

export type TStatus = 'DONE | HOLD | IN_PROCESS | CANCEL'

export type TTask = {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    createdBy: string;
    status: TStatus;
    assignName: string;
    assignId: string;
}

export type TUser = {
    createdAt: number;
    email: string;
    id: string;
    name: string;
}