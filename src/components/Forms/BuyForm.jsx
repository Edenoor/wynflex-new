import Button from '../Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useModalContext from "../../hooks/useModalContext"
import SuccessModal from './components/SuccesModal';
import reviewErrors from './utils/reviewErrors'


const BuyForm = ({ className, full, ...otherProps }) => {
    const { openModal } = useModalContext()

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('El nombre es requerido'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Teléfono invalido')
            .required('El número de teléfono es requerido'),
        email: Yup.string().email('Email invalido').required('El Email es requerido'),
        company_name: Yup.string().required('El nombre de la empresa es requerido'),
        location: Yup.string().required('Indique la localidad'),
        ecommerce_name: Yup.string(),
        monthly_shipping: Yup.string().required('Indique los envíos mensuales'),
        industry: Yup.string().required('Indique el rubro/industria'),
        ecommerce_url: Yup.string().url('Formato de URL invalida'),
        referral_code: Yup.string(),
        form_message: Yup.string().required('El mensaje es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            full_name: '',
            phone: '',
            email: '',
            company_name: '',
            location: '',
            ecommerce_name: '',
            monthly_shipping: '',
            industry: '',
            ecommerce_url: '',
            referral_code: '',
            form_message: '',
            full
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            formik.resetForm()
            openModal(SuccessModal, {})
            fetch(`${import.meta.env.VITE_BACKEND_URL}/hire`, {
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
        <form {...otherProps} onSubmit={formik.handleSubmit} className={`text-black bg-white rounded-xl flex flex-col px-12 py-16 max-w-2xl gap-5 ${className ? className : ''}`}>
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

            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
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

            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
                <span className="inline-block w-full">
                    <label htmlFor="company_name" className="mb-1">Nombre de la empresa *</label>
                    <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        className={`${reviewErrors(formik, 'company_name') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company_name}
                    />
                    {reviewErrors(formik, 'company_name') ? <h4 className="text-red-600">{formik.errors.company_name}</h4> : null}
                </span>

                <span className="inline-block w-full">
                    <label htmlFor="location" className="mb-1">Localidad *</label>
                    <select
                        className={`w-full field hover:cursor-pointer ${reviewErrors(formik, 'location') ? 'border-red-600' : ''}`}
                        name="location"
                        id="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                    >
                        <option value="" disabled hidden>
                            Selecciona una...
                        </option>
                        <option value="caba">CABA</option>
                        <option value="gba oeste">GBA Oeste</option>
                        <option value="gba este">GBA Este</option>
                        <option value="gba norte">GBA Norte</option>
                        <option value="gba sur">GBA Sur</option>
                    </select>
                    {reviewErrors(formik, 'location') ? <h4 className="text-red-600">{formik.errors.location}</h4> : null}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
                <span className="inline-block w-full">
                    <label htmlFor="ecommerce_name" className="mb-1">E-commerce de tienda</label>
                    <input
                        id="ecommerce_name"
                        name="ecommerce_name"
                        type="text"
                        className={`${reviewErrors(formik, 'ecommerce_name') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ecommerce_name}
                    />
                    {reviewErrors(formik, 'ecommerce_name') ? <h4 className="text-red-600">{formik.errors.ecommerce_name}</h4> : null}
                </span>

                <span className="inline-block w-full">
                    <label htmlFor="monthly_shipping" className="mb-1">Envios mensuales *</label>
                    <select
                        className={`w-full field hover:cursor-pointer ${reviewErrors(formik, 'monthly_shipping') ? 'border-red-600' : ''}`}
                        name="monthly_shipping"
                        id="monthly_shipping"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.monthly_shipping}
                    >
                        <option value="" disabled hidden>
                            Selecciona una...
                        </option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-250">100 - 250</option>
                        <option value="250-500">250 - 500</option>
                        <option value="500-1000">500 - 1000</option>
                        <option value="1000+">1000+</option>
                    </select>
                    {reviewErrors(formik, 'monthly_shipping') ? <h4 className="text-red-600">{formik.errors.monthly_shipping}</h4> : null}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
                <span className="inline-block w-full">
                    <label htmlFor="industry" className="mb-1">Rubro/Industria *</label>
                    <input
                        id="industry"
                        name="industry"
                        type="text"
                        className={`${reviewErrors(formik, 'industry') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.industry}
                    />
                    {reviewErrors(formik, 'industry') ? <h4 className="text-red-600">{formik.errors.industry}</h4> : null}
                </span>

                <span className="inline-block w-full">
                    <label htmlFor="ecommerce_url" className="mb-1">URL web de la tienda</label>
                    <input
                        id="ecommerce_url"
                        name="ecommerce_url"
                        type="text"
                        className={`${reviewErrors(formik, 'ecommerce_url') ? 'border-red-600' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ecommerce_url}
                    />
                    {reviewErrors(formik, 'ecommerce_url') ? <h4 className="text-red-600">{formik.errors.ecommerce_url}</h4> : null}
                </span>
            </div>

            <span>
                <label htmlFor="referral_code" className="mb-1">Código de referido</label>
                <input
                    id="referral_code"
                    name="referral_code"
                    type="text"
                    className={` ${reviewErrors(formik, 'referral_code') ? 'border-red-600' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referral_code}
                />
                {reviewErrors(formik, 'referral_code') ? <h4 className="text-red-600">{formik.errors.referral_code}</h4> : null}

            </span>

            <span>
                <label htmlFor="form_message" className="mb-1">Mensaje *</label>
                <textarea
                    name="form_message"
                    id="form_message"
                    className={`${reviewErrors(formik, 'form_message') ? 'border-red-600' : ''}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.form_message}
                ></textarea>
                {reviewErrors(formik, 'form_message') ? <h4 className="text-red-600">{formik.errors.form_message}</h4> : null}
            </span>

            <Button type='submit' disabled={!formik.isValid} className={'mx-auto lg:mx-0'}>Enviar</Button>
        </form >
    )
}

export default BuyForm