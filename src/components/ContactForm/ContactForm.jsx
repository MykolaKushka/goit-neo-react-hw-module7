import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    number: Yup.string()
      .required('Number is required')
      .matches(/^\d{3}-\d{2}-\d{2}$/, 'Number must be in the format 123-45-67'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.fieldsRow}>
          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={styles.input}
            />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor="number">
              Number
            </label>
            <Field
              type="text"
              name="number"
              id="number"
              className={styles.input}
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
