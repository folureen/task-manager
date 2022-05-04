import * as yup from "yup";


export const newTaskSchema = yup.object({
    title: yup.string().required('Обязательное поле').max(40, 'Максимум 40 символов').trim(),
    description: yup.string().required('Обязательное поле').min(5, 'Минимум 5 символов').max(300, 'Максимум 300 символов').trim()
}).required();