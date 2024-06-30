import { required, helpers, email, sameAs, requiredIf } from '@vuelidate/validators';

export const customRequired = {
    required: helpers.withMessage(
        ({ $property }) => {
            return `The ${$property.replaceAll('_', ' ')} field is required.`
        },
        required
    )
};

export const customEmail = {
    email: helpers.withMessage(
        ({ $property }) => {
            return `The ${$property} should be valid.`
        },
        email
    )
};

export const customOptional = (input) => {
    return {
        requiredIf: helpers.withMessage(
            'Image is not valid',
            requiredIf(function () {
                console.log('test----');
                return ('File' in window && input instanceof File) ? true : false;
            })
        )
    }
};

export const passwordConfirmation = (field) => {
    return {
        sameAs: helpers.withMessage(
            'Confirm password doesn\'t match password.',
            sameAs(field)
        )
    }
}
