import React, {useState} from 'react';

interface IFormFieldsInput {
    initialValues: object,
    callback: Function,
}

interface IFormFieldsOutput {
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    values: object,
    formValidated: boolean,
}

export default function useForm(props: IFormFieldsInput): IFormFieldsOutput {
    const [values, setValues] = useState(props.initialValues);
    const [formValidated, setFormValidated] = useState(false);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();
        setFormValidated(true);

        const inputs = form.querySelectorAll('input:invalid, select:invalid, textarea:invalid, input.is-invalid');

        if (form.checkValidity() === true && inputs.length === 0) {
            setFormValidated(false);
            await props.callback();
        } else {
            form.classList.add('was-validated');

            // scroll to the first error element
            const elemId = inputs[0].getAttribute('id');
            if (elemId && elemId.indexOf('file-') !== -1) {
                document.getElementById(elemId)?.parentElement?.scrollIntoView({block: 'end', behavior: 'smooth'});
            } else {
                (elemId ? document.getElementById(elemId) : inputs[0])?.scrollIntoView({block: 'end', behavior: 'smooth'});
            }
        }
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.currentTarget;
        setValues({...values, ...{[id]: value}});
    };

    return {
        onChange,
        onSubmit,
        values,
        formValidated
    };
}