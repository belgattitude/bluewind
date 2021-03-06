import React from 'react';
import { Form, Field, FieldRenderProps, FormSpy } from 'react-final-form';
import { StudentDetailDTO, getDefaultStudentApi } from './student.api';
import { TextField } from '../../component/ui/form';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from '../../component/ui/button';

type FormValues = Partial<StudentDetailDTO> & { username?: string };

const onSubmit = async (values: FormValues) => {
    console.log('ONSUBMIT', values);
    const val = { ...values };
    await getDefaultStudentApi()
        .save(val as any)
        .then(response => {
            console.log('subimitted form', response);
        });
};

type Props = {
    children?: never;
    data: FormValues;
    className?: string;
};

const TextFieldWrapper: React.FC<FieldRenderProps<string, HTMLElement>> = ({
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
    // {meta.error && meta.touched && <span>{meta.error}</span>}
    return (
        <>
            <TextField
                {...rest}
                onChange={e => {
                    console.log('changed');
                    onChange(e);
                }}
                onBlur={e => {
                    onBlur(e);
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
        if (!values.first_name) {
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
                subscription={{ submitting: true, pristine: true }}
                //keepDirtyOnReinitialize={false}
                //validate={validate}
                onSubmit={onSubmit}
                render={({ handleSubmit, form, pristine, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
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

                        {values ? (
                            <pre>{JSON.stringify(values, undefined, 2)}</pre>
                        ) : (
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
                            </FormSpy>
                        )}
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
