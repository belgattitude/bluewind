import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
    },
}));
//https://medium.com/codefully-io/react-forms-validation-with-formik-and-material-ui-1adf0c1cae5c

const TeacherForm: React.FC<{}> = () => {
    const classes = useStyles();

    const handleClose = () => {};
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <Formik
                initialValues={{ email: '', name: '', comment: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    /*
                axios.post(contactFormEndpoint,
                    values,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        }
                    },
                ).then((resp) => {
                        setSubmitionCompleted(true);
                    }
                );*/
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Required'),
                    name: Yup.string().required('Required'),
                    comment: Yup.string().required('Required'),
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="name"
                                name="name"
                                className={classes.textField}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.name && touched.name && errors.name}
                                margin="normal"
                            />

                            <TextField
                                error={errors.email && (touched.email as any)}
                                label="email"
                                name="email"
                                className={classes.textField}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.email && touched.email && errors.email}
                                margin="normal"
                            />

                            <TextField
                                label="comment"
                                name="comment"
                                className={classes.textField}
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.comment && touched.comment && errors.comment}
                                margin="normal"
                            />
                            <DialogActions>
                                <Button disabled={isSubmitting} onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};

export default TeacherForm;
