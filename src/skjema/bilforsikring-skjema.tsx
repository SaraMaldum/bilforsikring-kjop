import React from 'react';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import '../App.scss';

interface FormData {
    fornavn: string,
    etternavn: string,
    bonus: string,
    regnr: string,
    fodselsnummer: string,
    email: string
}

const Form: React.FC = () => {
    const initialValues: FormData = {
        fornavn: '',
        etternavn: '',
        bonus: '60',
        regnr: '',
        fodselsnummer: '',
        email: ''
    };

    const schema = Yup.object().shape({
        fornavn: Yup.string().required('Du må fylle ut fornavn'),
        etternavn: Yup.string().required('Du må fylle ut etternavn'),
        regnr: Yup.string().required('Du må fylle ut bilens registreringsnummer').matches(/^[A-Z]{2}\s\d{5}$/, 'Bilens registreringsnummer må være gyldig'),
        fodselsnummer: Yup.string().required('Du må fylle inn ditt fødselsnummer').matches(/^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}\d{5}$/, 'Fødselsnummer må være gyldig, 11 siffer'),
        email: Yup.string().required('Du må fylle ut epostadressen din'),
    });

    const handleSubmit = (
        values: FormikValues,
        {setSubmitting}: FormikHelpers<FormData>
    ) => {
        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
        }, 500);
    };

    return (
        <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}>
            {({handleSubmit, handleReset}) => (
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
                            <label htmlFor="fodselsnummer">Fødselsnummer
                                <Field type="text" name="fodselsnummer" id="fodselsnummer" placeholder="11 siffer"/>
                                <ErrorMessage name="fodselsnummer" component="div" className="error"/>
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

                        <div className="bilforsikring-skjema--item">
                            <button type="submit" className="btn btn-beregn">Beregn pris</button>
                            <button type="button" onClick={handleReset} className="btn btn-avbryt">Avbryt</button>
                        </div>
                    </div>
                    {/*    Legg inn beregnet pris her */}
                </form>
            )}
        </Formik>
    );
};

export default Form;
