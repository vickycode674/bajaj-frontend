import React, { useState } from 'react';
import { getOperationCode, postData } from '../api';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        rollNumber: '',
        numbers: [],
        alphabets: [],
        file: null,
    });

    const [response, setResponse] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append form data
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item) => data.append(key, item));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await postData(data);
            setResponse(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="User ID"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="College Email"
                />
                <input
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="College Roll Number"
                />
                <input
                    name="numbers"
                    onChange={(e) => setFormData({ ...formData, numbers: e.target.value.split(',') })}
                    placeholder="Numbers (comma separated)"
                />
                <input
                    name="alphabets"
                    onChange={(e) => setFormData({ ...formData, alphabets: e.target.value.split(',') })}
                    placeholder="Alphabets (comma separated)"
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default FormComponent;
