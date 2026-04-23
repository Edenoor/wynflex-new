import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useModalContext from "../../hooks/useModalContext"
import SuccessModal from "./components/SuccesModal";
import reviewErrors from "./utils/reviewErrors";

const EmploymentForm = ({ className, ...otherProps }) => {
    const { openModal } = useModalContext()

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('El nombre es requerido'),
        email: Yup.string().email('Email invalido').required('El Email es requerido'),
        cv: Yup.mixed()
            .test('fileSize', 'El archivo debe de pesar menos de 3MB', (value) => {
                if (!value) return false;
                return value.size <= 3 * 1024 * 1024;
            })
            .test('fileType', 'El archivo debe ser DOC, DOCX o PDF', (value) => {
                if (!value) return false;
                const allowedFileTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
                return allowedFileTypes.includes(value.type);
            })
            .required('El CV es requerido'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Teléfono invalido')
            .required('El número de teléfono es requerido'),
        portfolio: Yup.string().url('Formato de URL invalida').required('La URL es requerida'),
        form_message: Yup.string().required('El mensaje es requerido'),
        pronouns: Yup.string().required('Selecciona pronombres'),
        area: Yup.string().required('Selecciona el área a la que deseas aplicar'),
    });

    const formik = useFormik({
        initialValues: {
            full_name: '',
            phone: '',
            email: '',
            pronouns: '',
            area: '',
            cv: null,
            portfolio: '',
            form_message: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            formik.resetForm()
            openModal(SuccessModal, {})
            fetch(`${import.meta.env.VITE_BACKEND_URL}/apply`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        },
    });

    return (
        <form {...otherProps} onSubmit={formik.handleSubmit} className={`text-black bg-white rounded-xl flex flex-col px-10 py-16 max-w-2xl gap-5 ${className ? className : ''}`}>
            <h3 className="mb-5">Datos de contacto</h3>
            <span>
                <label htmlFor="full_name" className="mb-1">Nombre y Apellido *</label>
                <input id="full_name"
                    name="full_name"
                    type="text"
                    className={`${reviewErrors(formik, 'full_name') ? 'border-red-600' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.full_name}
                />
                {reviewErrors(formik, 'full_name') ? <h4 className="text-red-600">{formik.errors.full_name}</h4> : null}
            </span>

            <div className="flex flex-col lg:flex-row gap-5 justify-between lg:gap-10">
                <span className="inline-block w-full">
                    <label htmlFor="phone" className="mb-1">Número de teléfono *</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        className={`${reviewErrors(formik, 'phone') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {reviewErrors(formik, 'phone') ? <h4 className="text-red-600">{formik.errors.phone}</h4> : null}
                </span>
                <span className="inline-block w-full">
                    <label htmlFor="email" className="mb-1">Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        className={`${reviewErrors(formik, 'email') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {reviewErrors(formik, 'email') ? <h4 className="text-red-600">{formik.errors.email}</h4> : null}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 justify-between lg:gap-10">
                <span className="inline-block w-full">
                    <label htmlFor="pronouns" className="mb-1">Pronombre/s *</label>
                    <select
                        name="pronouns"
                        id="pronouns"
                        className={`w-full field hover:cursor-pointer ${reviewErrors(formik, 'pronouns') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pronouns}
                    >
                        <option value="" disabled hidden>
                            Selecciona una...
                        </option>
                        <option value="ella">Ella</option>
                        <option value="elle">Elle</option>
                        <option value="el">Él</option>
                    </select>
                    {reviewErrors(formik, 'pronouns') ? <h4 className="text-red-600">{formik.errors.pronouns}</h4> : null}
                </span>

                <span className="inline-block w-full">
                    <label htmlFor="area" className="mb-1">Área a aplicar *</label>
                    <select
                        className={`w-full field hover:cursor-pointer ${reviewErrors(formik, 'area') ? 'border-red-600' : ''}`}
                        name="area"
                        id="area"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.area}
                    >
                        <option value="" disabled hidden>
                            Selecciona una...
                        </option>
                        <option value="reparto">Reparto</option>
                        <option value="coordinacion">Coordinación</option>
                        <option value="developers">Developers</option>
                        <option value="diseño">Diseño UX/UI</option>
                        <option value="community manager">Community Manager</option>
                    </select>
                    {reviewErrors(formik, 'area') ? <h4 className="text-red-600">{formik.errors.area}</h4> : null}
                </span>
            </div>

            <span className="relative">
                <label htmlFor="cv" className="mb-1">Adjuntá tu CV *</label>
                <label
                    htmlFor="cv"
                    className={`field flex items-center w-[75%] hover:cursor-pointer ${formik.errors.cv ? 'border-red-600' : ''}`}
                >
                    {formik.values.cv && !formik.errors.cv && (
                        <h4 className="text-green-600">
                            {formik.values.cv.name} ({(formik.values.cv.size / (1024 * 1024)).toFixed(2)}MB)
                        </h4>
                    )}
                    {formik.errors.cv && (
                        <h4 className="text-red-600">{formik.errors.cv}</h4>
                    )}
                    <img className="h-7 ml-auto" src="/media/svg/upload-icon.svg" alt="" />
                    <input
                        type="file"
                        name="cv"
                        id="cv"
                        onChange={(event) => {
                            formik.setFieldValue('cv', event.currentTarget.files[0]);
                        }}
                        onBlur={formik.handleBlur}

                        accept=".doc,.docx,.pdf"
                        hidden
                    />
                    <svg className="w-10 absolute right-0"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Capa 2"
                        viewBox="0 0 771.81 652.24"
                    >
                        <g data-name="Capa 1">
                            <rect
                                width={771.81}
                                height={652.24}
                                rx={195.67}
                                ry={195.67}
                                style={{
                                    fill: formik.values.cv && !formik.errors.cv ? '#6DB455' : '#d9d9d9',
                                    strokeWidth: 0,
                                }}
                            />
                            <rect
                                width={766.38}
                                height={646.8}
                                x={2.72}
                                y={2.72}
                                rx={192.95}
                                ry={192.95}
                                style={{
                                    fill: "none",
                                    stroke: "rgba(0,0,0,.4)",
                                    strokeWidth: ".5px",
                                }}
                            />
                            <path
                                d="m144.64 323.41 86.75 157.23L627.18 171.6"
                                style={{
                                    fill: "none",
                                    stroke: formik.values.cv && !formik.errors.cv ? '#fff' : '#b3acac',
                                    strokeWidth: 30,
                                }}
                            />
                        </g>
                    </svg>
                </label>
            </span>

            <span>
                <label htmlFor="portfolio" className="mb-1">URL de Linkedin o Portfolio *</label>
                <input
                    id="portfolio"
                    name="portfolio"
                    type="text"
                    className={`lg:w-[75%] ${reviewErrors(formik, 'portfolio') ? 'border-red-600' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.portfolio}
                />
                {reviewErrors(formik, 'portfolio') ? <h4 className="text-red-600">{formik.errors.portfolio}</h4> : null}

            </span>

            <span>
                <label htmlFor="form_message" className="mb-1">Mensaje *</label>
                <textarea
                    name="form_message"
                    id="form_message"
                    placeholder="Presentate, contanos algo que creas importante que sepamos de vos"
                    className={`${reviewErrors(formik, 'form_message') ? 'border-red-600' : ''}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.form_message}
                ></textarea>
                {reviewErrors(formik, 'form_message') ? <h4 className="text-red-600">{formik.errors.form_message}</h4> : null}
            </span>

            <Button className={'mx-auto lg:mx-0'} type='submit' disabled={!formik.isValid}>Enviar</Button>
        </form >
    )
}

export default EmploymentForm