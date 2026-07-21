import "./CouponForm.css";

function CouponForm() {

    return (

        <div className="coupon-box">

            <h3>

                Have a Coupon?

            </h3>

            <div className="coupon-form">

                <input
                    type="text"
                    placeholder="Enter coupon code"
                />

                <button>

                    Apply

                </button>

            </div>

        </div>

    );

}

export default CouponForm;