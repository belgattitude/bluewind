import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, makeStyles, TextField } from '@material-ui/core';

import { RequiredKeys } from 'utility-types';
import { createTeacher } from '../teacher.api';
import { CreateTeacherDto } from '@bluewind/api/teacher/dto/create-teacher.dto';

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
};

const defaultValues: Pick<FormValues, RequiredKeys<FormValues>> = {
    firstName: '',
    lastName: '',
    email: '',
};

const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        padding: '1em',
        margin: '1em',
    },
}));
//https://medium.com/codefully-io/react-forms-validation-with-formik-and-material-ui-1adf0c1cae5c

const TeacherForm: React.FC<{}> = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <Formik
                initialValues={defaultValues}
                onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
                    const data: CreateTeacherDto = {
                        lastName: values.lastName,
                        email: values.email,
                        firstName: values.firstName,
                    };
                    setSubmitting(true);
                    createTeacher(data)
                        .then(response => {
                            setSubmitting(false);
                            setOpen(false);
                        })
                        .catch(error => {
                            alert('error');
                        });
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Required'),
                    lastName: Yup.string().required('Required'),
                    firstName: Yup.string().required('Required'),
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
                                label="firstName"
                                name="firstName"
                                className={classes.textField}
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.firstName && touched.firstName && errors.firstName}
                                margin="normal"
                            />

                            <TextField
                                label="lastName"
                                name="lastName"
                                className={classes.textField}
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.lastName && touched.lastName && errors.lastName}
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

                            <DialogActions>
                                <Button disabled={isSubmitting} onClick={() => handleClose()}>
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
