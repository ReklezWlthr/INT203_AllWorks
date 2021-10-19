const constraint = {
    fname: {
        presence: {
            attribute: true,
            allowEmpty: false
        },
    },
    lname: {
        presence: {
            attribute: true,
            allowEmpty: false
        },
    },
    age: {
        presence: {
            attribute: true,
            allowEmpty: false
        },
        numericality: {
            lessThan: 120,
            greaterThan: 6
        }
    },
    gender: {
        presence: {
            attribute: true,
            allowEmpty: false
        }
    },
    email: {
        presence: {
            attribute: true,
            allowEmpty: false
        },
        email: {
            attribute: true,
            message: 'has invalid pattern'
        }
    },
    phone: {
        format: {
            pattern: "[0-9]+",
            message: "can only contain 0-9"
        },
        length: {
            minimum: 9,
            maximum: 10,
            message: 'has invalid pattern'
        }
    },
    user: {
        presence: {
            attribute: true,
            allowEmpty: false
        }
    },
    password: {
        presence: {
            attribute: true,
            allowEmpty: false
        }
    },
    confirmPassword: {
        presence: {
            attribute: true,
            allowEmpty: false
        }
    }
}

const pass = {
    confirmPassword: {
        equality: {
            attribute: 'password',
            message: "does not match your password"
        }
    }
}

const passVal = {
    password: {
        format: {
            pattern: "[a-z0-9]*"
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            pro: './images/pro.jpg',
            fname: null,
            lname: null,
            age: null,
            gender: null,
            email: null,
            phone: null,
            user: null,
            password: null,
            confirmPassword: null,
            errors: null,
            isInequal: false,
            passValidation: null,
            equality: null,
            art: 12,
            fol: 116,
            rate: 4.3,
            row: 'flex justify-start w-full gap-x-5 mb-3',
            tb: 'bg-gray-100 py-1 px-2 text-sm rounded-sm focus:outline-none focus:ring focus:ring-red-200 transition duration-100',
            errorClass: 'text-red-600 text-xs',
            f: "border-red-200 hover:border-red-400",
            m: "border-blue-200 hover:border-blue-500",
            passOn: true,
            conPassOn: true
        }
    },
    methods: {
        validateForm() {
            this.errors = validate({
                fname: this.fname,
                lname: this.lname,
                age: this.age,
                gender: this.gender,
                email: this.email,
                phone: this.phone,
                user: this.user,
                password: this.password,
                confirmPassword: this.confirmPassword
            }, constraint)
            if (!this.errors) {
                alert('Your profile is updated successfully');
            }
        },
        validatePassword() {
            this.equality = validate({
                confirmPassword: this.confirmPassword,
                password: this.password
            }, pass, {
                format: 'flat'
            });
            if (this.equality && !validate.isEmpty(this.confirmPassword)) {
                this.isInequal = true;
            } else {
                this.isInequal = false;
            }
        },
        validatePattern() {
            this.passValidation = validate({
                password: this.password
            }, passVal);
        },
        togglePass() {
            this.passOn = !this.passOn;
        },
        toggleConPass() {
            this.conPassOn = !this.conPassOn;
        },
        upload(e) {
            var file = e.target.files[0];
            if (file.type.includes("image")) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.pro = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert("This file is not an image file.")
            }
        }
    },
    computed: {
        genderSwitch(){
            if(this.gender=='m'){
                return this.m;
            } else if(this.gender=='f') {
                return this.f;
            }
        }
    }
})