import axios from "axios";
import { useEffect, useState } from "react";


function ModalPut(props) {
    const { datas, profile } = props;
    const token = localStorage.getItem('jwtToken');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        stateProvince: '',
        country: '',
        postalCode: ''
    });

    useEffect(() => {
        if (datas) {
            setFormData({
                firstName: datas.firstName || '',
                lastName: datas.lastName || '',
                phoneNumber: datas.phoneNumber || '',
                dateOfBirth: datas.dateOfBirth || '',
                gender: datas.gender || '',
                address: datas.address?.address || '',
                city: datas.address?.city || '',
                stateProvince: datas.address?.stateProvince || '',
                country: datas.address?.country || '',
                postalCode: datas.address?.postalCode || ''
            });
        }
    }, [datas]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:1150/api/v1/auth', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                profile();
            }


        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    }

    var lenFirstName = formData.firstName.length;
    const isFirstName = lenFirstName >= 1 && lenFirstName <= 60;

    return (
        <div>
            <button type="button" className="btn-item btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#putModal">
                Edit profile
            </button>

            <div className="modal fade" id="putModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3 " >
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom01" className="form-label">First name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom01"
                                            name="firstName"
                                            maxLength={60}
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom02" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom02"
                                            name="lastName"
                                            maxLength={60}
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustomUsername"
                                            defaultValue={datas.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            aria-label="Default select Gender" >
                                            <option value="">-</option>
                                            <option value="Man">Man</option>
                                            <option value="Woman">Woman</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom10" className="form-label">Date of birth</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="validationCustom10"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom09" className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom09"
                                            name="phoneNumber"
                                            maxLength={10}
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom03" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom03"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom05" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom05"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom06" className="form-label">State province</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom06"
                                            name="stateProvince"
                                            value={formData.stateProvince}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom07" className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom07"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="validationCustom08" className="form-label">Zip</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="validationCustom08"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={!isFirstName}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPut;