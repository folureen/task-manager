import * as yup from "yup";

const passwordLength = 6;
const nameLength = 6;

export const registrationSchema = yup.object({
    name: yup.string().required('Обязательное поле').trim().min(nameLength, `Имя должно состоять минимум из ${nameLength} символов`),
    email: yup.string().required('Обязательное поле').email('Некорретный формат').trim(),
    password: yup.string().required('Обязательное поле').min(passwordLength, `Пароль должен состоять минимум из ${passwordLength} символов`),
}).required();