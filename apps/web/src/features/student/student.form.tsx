import React from 'react';
import { Form, Field } from 'react-final-form';
import { StudentDetailDTO, studentApi } from './student.api';
import snakecaseKeys from 'snakecase-keys';

type FormValues = Partial<StudentDetailDTO>;

const onSubmit = async (values: FormValues) => {
    const val = snakecaseKeys({ id: 1, ...values });
    studentApi.saveStudent(val).then(response => {
        console.log('returned response', response);
    });
};

type Props = {
    children?: never;
    data: FormValues;
};

export const StudentForm: React.FC<Props> = props => {
    const initialValues = props.data;
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form, pristine, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <Field<string> name="first_name" component="input" placeholder="First Name" />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <Field<string> name="last_name" component="input" placeholder="Last Name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field<number> name="email" component="input" placeholder="Email" />
                    </div>
                    <div>
                        <label htmlFor="sex">Sex</label>
                        <Field<number> name="sex" component="input" placeholder="Sex" />
                    </div>

                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                        <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                            Reset
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

                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />
    );
};
