import React from "react";
import { Github } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import { Linkedin } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Footer() {
	return (
		<Container>
			<footer className="d-flex flex-wrap justify-content-between align-items-center pt-3 pb-2 my-2 border-top">
				<Col md={4} className="d-flex align-items-center">
					<span>© Marco Garcia</span>
				</Col>

				<Nav
					as={Col}
					md={4}
					className="justify-content-end list-unstyled d-flex"
				>
					<Nav.Item>
						<Nav.Link href="https://github.com/marcogarciamuro" target="_blank">
							<Github size={24} />
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="https://www.linkedin.com/in/marco-garcia-muro/" target="_blank">
							<Linkedin size={24} />
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</footer>
		</Container>
	);
}

export default Footer;
