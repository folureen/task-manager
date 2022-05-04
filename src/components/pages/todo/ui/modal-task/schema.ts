import * as yup from "yup";

export const commentSchema = yup.object({
    comment: yup.string().trim().min(1, `Минимум 1 символ`),
}).required();