import React from 'react';
import {Form, Field} from "react-final-form";
import {IStudentDetailDTO, studentApi} from "./student.api";
import snakecaseKeys from "snakecase-keys";

type FormValues = Partial<IStudentDetailDTO>

const onSubmit = async (values: FormValues) => {
    const val = snakecaseKeys({id: 1, ... values});
    studentApi.saveStudent(val).then(response => {
        console.log('returned response', response);
    })
};

type Props = {
    children?: never,
    data: FormValues
}

export const StudentForm: React.FC<Props> = (props) => {
    const initialValues = props.data;
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form, pristine, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <Field<string>
                            name="first_name"
                            component="input"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <Field<string>
                            name="last_name"
                            component="input"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <Field<number>
                            name="email"
                            component="input"
                            placeholder="Email"
                        />
                    </div>
                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button>
                    </div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />

    );
};
