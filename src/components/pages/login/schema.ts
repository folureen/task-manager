import * as yup from "yup";

const passwordLength = 6;

export const loginSchema = yup.object({
    email: yup.string().required('Обязательное поле').email('Некорретный формат').trim(),
    password: yup.string().required('Обязательное поле').min(passwordLength, `Пароль должен состоять минимум из ${passwordLength} символов`),
}).required();