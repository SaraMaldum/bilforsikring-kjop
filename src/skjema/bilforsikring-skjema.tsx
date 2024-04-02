import React, {useState} from 'react';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../App.scss';
import './bilforsikring.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

interface FormData {
    fornavn: string,
    etternavn: string,
    bonus: string,
    regnr: string,
    fnr: string,
    email: string
}

const Form: React.FC = () => {
    const initialValues: FormData = {
        fornavn: '',
        etternavn: '',
        bonus: '60',
        regnr: '',
        fnr: '',
        email: ''
    };

    const [price, setPrice] = useState<number | null>(null);

    const schema = Yup.object().shape({
        fornavn: Yup.string().required('Du må fylle ut fornavn'),
        etternavn: Yup.string().required('Du må fylle ut etternavn'),
        regnr: Yup.string().required('Du må fylle ut bilens registreringsnummer').matches(/^[A-Z]{2}\s\d{5}$/, 'Bilens registreringsnummer må være gyldig'),
        fnr: Yup.string().required('Du må fylle inn ditt fødselsnummer').matches(/^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}\d{5}$/, 'Fødselsnummer må være gyldig, 11 siffer'),
        email: Yup.string().required('Du må fylle ut epostadressen din'),
    });

    const calculatePrice = (formData: FormData): number => {
        return parseInt(formData.bonus) * 50;
    };

    const handleSubmit = (values: FormData) => {
        const calculatedPrice = calculatePrice(values);
        setPrice(calculatedPrice);
    };

    const handleCustomReset = (resetForm: () => void) => {
        setPrice(null);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}>
            {({handleSubmit, resetForm}) => (
                <form onSubmit={handleSubmit} className="bilforsikring-skjema">
                    <div className="bilforsikring-skjema--container">
                        <div className="bilforsikring-skjema--item">
                            <label htmlFor="regnr">
                                Bilens registreringsnummer
                                <Field type="text" name="regnr" id="regnr" placeholder="E.g. AB 12345"/>
                                <ErrorMessage name="regnr" component="div" className="error"/>
                            </label>
                        </div>

                        <div className="bilforsikring-skjema--item">
                            <label htmlFor="bonus">Bonus
                                <Field type="text" name="bonus" id="bonus" as="select">
                                    <option value="60">60</option>
                                    <option value="70">70</option>
                                    <option value="75">75</option>
                                </Field>
                            </label>
                        </div>

                        <div className="bilforsikring-skjema--item">
                            <label htmlFor="fnr">Fødselsnummer
                                <Field type="text" name="fnr" id="fnr" placeholder="11 siffer"/>
                                <ErrorMessage name="fnr" component="div" className="error"/>
                            </label>
                        </div>

                        <div className="navn-wrapper">
                            <div className="bilforsikring-skjema--item">
                                <label htmlFor="fornavn">
                                    Fornavn
                                    <Field type="text" name="fornavn" id="fornavn"/>
                                    <ErrorMessage name="fornavn" component="div" className="error"/>
                                </label>
                            </div>
                            <div className="bilforsikring-skjema--item test">
                                <label htmlFor="etternavn">Etternavn
                                    <Field type="text" name="etternavn" id="etternavn"/>
                                    <ErrorMessage name="etternavn" component="div" className="error"/>
                                </label>
                            </div>
                        </div>

                        <div className="bilforsikring-skjema--item">
                            <label htmlFor="email">Epostadresse
                                <Field type="email" name="email" id="email" placeholder="test@test.com"/>
                                <ErrorMessage name="email" component="div" className="error"/>
                            </label>
                        </div>

                        {price !== null && (
                            <div className="bilforsikring-skjema--pris">
                                <div>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    <span className="bilforsikring-skjema--prisbelop">Prisen på din forsikring pr år blir følgende: {price} kr.</span>
                                </div>
                            </div>
                        )}

                        <div className="bilforsikring-skjema--item">
                            <button type="submit" className="btn btn-beregn">Beregn pris</button>
                            <button type="button" onClick={() => handleCustomReset(resetForm)}
                                    className="btn btn-avbryt">Avbryt
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Form;
