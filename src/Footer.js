import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Footer() {
	return (
		<Container>
			<footer
				className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
				style={{ width: "100%" }}
			>
				<Col md={4} className="d-flex align-items-center">
					<span className="mb-3 mb-md-0">© Marco Garcia Muro</span>
				</Col>

				<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li className="ms-3">
						<a
							href="https://www.linkedin.com/in/marco-garcia-muro/"
							target="_blank"
							rel="noreferrer"
						>
							<svg className="bi" width="24" height="24">
								<FontAwesomeIcon icon={faLinkedin} />
							</svg>
						</a>
					</li>
					<li className="ms-3">
						<a
							href="https://github.com/marcogarciamuro"
							target="_blank"
							rel="noreferrer"
						>
							<svg className="bi" width="24" height="24">
								<FontAwesomeIcon icon={faGithub} />
							</svg>
						</a>
					</li>
				</ul>
			</footer>
		</Container>
	);
}

export default Footer;
