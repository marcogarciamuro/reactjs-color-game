import React from "react";
import Toast from "react-bootstrap/Toast";

function StatsResetToast(props) {
	return (
		<Toast
			onClose={() => props.setShow(false)}
			show={props.show}
			delay={3000}
			className="px-0"
			autohide
			style={{ width: "180px" }}
		>
			<Toast.Header>
				<small className="me-auto">Just Now</small>
			</Toast.Header>
			<Toast.Body>Your stats were reset!</Toast.Body>
		</Toast>
	);
}

export default StatsResetToast;
