import classNames from 'classnames/bind';
import styles from './AddressProfile.module.scss';
import AddressItem from '~/components/AddressItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { initStateAddress, addressReducer } from '~/reducers/addressReducers';
import { setIDAccount, setInfoPhone, setInfoName, setAddress } from '~/actions/addressActions';
const cx = classNames.bind(styles);

function AddressProfile() {
    const [statusModal, setStatusModal] = useState(false);
    const [stateAddress, dispatchAddress] = useReducer(addressReducer, initStateAddress);
    const [addressData, setAddressData] = useState([]);
    const [cookies, setCookie] = useCookies(['name']);
    let navigate = useNavigate();

    useEffect(() => {
        if (cookies.name) {
            dispatchAddress(setIDAccount(cookies.name.ID));
            getCourses();
        } else {
            navigate('/login');
        }
    }, []);

    const getCourses = async () => {
        await axios
            .post('http://26.17.209.162/api/shippinginfo/post', {
                type: 'get',
                data: { IDACCOUNT: cookies.name.ID },
            })
            .then((res) => {
                setAddressData(res.data);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post('http://26.17.209.162/api/shippinginfo/post', {
                type: 'create',
                data: stateAddress,
            })
            .then((response) => {
                if (response.data == 1) {
                    setStatusModal(false);
                    getCourses();
                }
            });
    };

    const showBuyTickets = () => {
        setStatusModal(true);
    };
    const hideBuyTickets = () => {
        setStatusModal(false);
    };

    return (
        <>
            <h2 className={cx('title')}>?????a ch??? giao h??ng</h2>

            {addressData != 0 ? (
                addressData.map((address) => {
                    return (
                        <AddressItem
                            key={address.SHOPPINGINFOID}
                            SHOPPINGINFOID={address.SHOPPINGINFOID}
                            SHOPPINGINFONAME={address.SHOPPINGINFONAME}
                            IDACCOUNT={address.IDACCOUNT}
                            SHOPPINGINFOPHONE={address.SHOPPINGINFOPHONE}
                            ADDRESS={address.ADDRESS}
                        />
                    );
                })
            ) : (
                <></>
            )}
            <div className={cx('action')}>
                <button className={cx('add_btn')} onClick={showBuyTickets}>
                    Th??m ?????a ch???
                </button>
            </div>

            {/* Begin modal */}
            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Th??m ?????a ch???</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={cx('stock-list')}>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    T??n ng?????i nh???n
                                </label>
                                <input
                                    required
                                    className={cx('input-item')}
                                    type="text"
                                    placeholder="T??n ng?????i nh???n"
                                    onChange={(e) => dispatchAddress(setInfoName(e.target.value))}
                                />
                            </div>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    ?????a ch???
                                </label>
                                <input
                                    required
                                    className={cx('input-item')}
                                    type="text"
                                    placeholder="?????a ch???"
                                    onChange={(e) => dispatchAddress(setAddress(e.target.value))}
                                />
                            </div>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    S??? ??i???n tho???i
                                </label>
                                <input
                                    className={cx('input-item')}
                                    type="text"
                                    placeholder="S??? ??i???n tho???i"
                                    required
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => dispatchAddress(setInfoPhone(e.target.value))}
                                />
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* End modal */}
        </>
    );
}

export default AddressProfile;
