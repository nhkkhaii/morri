import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/DefaultLayout/Footer';
import SidebarProfile from '~/components/SidebarProfile';

function DefaultProfile({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className=" grid wide">
                    <div className="row">
                        <h2 className="title col l-12" style={{ marginTop: '40px' }}>
                            Thông tin cá nhân
                        </h2>
                        <SidebarProfile />
                        <div className="col l-8">{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultProfile;
