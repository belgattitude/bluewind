import React from 'react';
import {Form, Field, withTypes} from "react-final-form";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FormValues {
    firstName?: string;
    lastName?: string;
}

const onSubmit = async (values: FormValues) => {
    await sleep(300);
    window.alert(JSON.stringify(values, undefined, 2));
};

type Props = {
    children?: never
}

export const StudentForm: React.FC<Props> = (props) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ firstName: 'cool', lastName: 'hello' }}
            render={({ handleSubmit, form, pristine, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field<string>
                            name="firstName"
                            component="input"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field<string>
                            name="lastName"
                            component="input"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <Field<number>
                            name="age"
                            component="input"
                            placeholder="Age"
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
