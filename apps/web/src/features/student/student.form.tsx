import React, { ComponentClass } from 'react';
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { StudentDetailDTO, getStudentApi } from './student.api';
import snakecaseKeys from 'snakecase-keys';
import { TextField } from '../../component/ui/form';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from '../../component/ui/button';

type FormValues = Partial<StudentDetailDTO> & { username?: string };

const onSubmit = async (values: FormValues) => {
    const val = snakecaseKeys({ id: 1, ...values });
    getStudentApi()
        .save(val)
        .then(response => {
            console.log('returned response', response);
        });
};

type Props = {
    children?: never;
    data: FormValues;
    className?: string;
};

const TextFieldWrapper: React.FC<FieldRenderProps<string, HTMLElement>> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
    console.log('onchange', onChange);
    return (
        <>
            <TextField
                {...rest}
                onChange={e => {
                    console.log('changed');
                    onChange(e);
                }}
                name={name}
                css={css``}
                value={value}
            />
            {showError && <div>{meta.error}</div>}
        </>
    );
};

export const UnstyledStudentForm: React.FC<Props> = props => {
    const initialValues = props.data;

    const validate = (values: FormValues) => {
        const errors: Partial<FormValues> = {};
        if (!values.username) {
            errors.username = 'Required';
        }

        if (!!values.first_name) {
            errors.first_name = 'Required';
        }
        if (!values.last_name) {
            errors.last_name = 'Required';
        }
        return errors;
    };

    return (
        <div className={props.className}>
            <Form
                initialValues={initialValues}
                keepDirtyOnReinitialize={false}
                validate={validate}
                onSubmit={onSubmit}
                render={({ handleSubmit, form, pristine, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="username">
                            {({ input, meta }) => (
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <TextField name="username" {...input} type="text" placeholder="Username" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <Field<string> name="first_name" component={TextFieldWrapper} placeholder="First Name" />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <Field<string> name="last_name" component={TextFieldWrapper} placeholder="Last Name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field<string> name="email" component={TextFieldWrapper} placeholder="Email" />
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <Field<string> name="sex" component={TextFieldWrapper} placeholder="Gender" />
                        </div>
                        <div className="buttons">
                            <Button variant="reset" m={[1]} onClick={form.reset} disabled={submitting || pristine}>
                                Reset
                            </Button>
                            <Button type="submit" m={[1]} disabled={submitting || pristine}>
                                Save
                            </Button>
                        </div>
                        <h1>Abonnements</h1>
                        <div>
                            <div>Red | 3/5 | Expires in 5 days</div>
                            <div>Red | 5/5 | Expired</div>
                            <div>Blue | 5/5 | Expired</div>
                            <div>more...</div>
                        </div>
                        <h1>Past classes</h1>
                        <div>
                            <div>Tuesday 15th - 18h30</div>
                            <div>Tuesday 15th - 18h30</div>
                            <div>Tuesday 15th - 18h30</div>
                            <div>more...</div>
                        </div>

                        <pre>{JSON.stringify(values, undefined, 2)}</pre>
                    </form>
                )}
            />
        </div>
    );
};

export const StudentForm = styled(UnstyledStudentForm)`
    form {
        div {
            display: flex;
            flex-direction: row;

            label {
                flex: 1 0;
            }
            input {
                flex: 1 1 0;
            }
        }
    }
`;
