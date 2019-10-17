import React from 'react';
import { Form as FinalForm, Field as FinalField, FieldRenderProps } from 'react-final-form';
import { StudentDetailDTO, studentApi } from './student.api';
import snakecaseKeys from 'snakecase-keys';
import { TextField } from '../../component/ui/form';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from '../../component/ui/button';

type FormValues = Partial<StudentDetailDTO>;

const onSubmit = async (values: FormValues) => {
    const val = snakecaseKeys({ id: 1, ...values });
    studentApi.save(val).then(response => {
        console.log('returned response', response);
    });
};

type Props = {
    children?: never;
    data: FormValues;
    className?: string;
};

const TextFieldWrapper: React.FC<FieldRenderProps<any, any>> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

    return <TextField {...rest} name={name} css={css``} onChange={onChange} value={value} />;
};

export const UnstyledStudentForm: React.FC<Props> = props => {
    const initialValues = props.data;
    return (
        <div className={props.className}>
            <FinalForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, pristine, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <FinalField<string>
                                name="first_name"
                                component={TextFieldWrapper}
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <FinalField<string> name="last_name" component={TextFieldWrapper} placeholder="Last Name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <FinalField<number> name="email" component={TextFieldWrapper} placeholder="Email" />
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <FinalField<number> name="sex" component={TextFieldWrapper} placeholder="Gender" />
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
                flex: 1 1 0%;
            }
        }
    }
`;
