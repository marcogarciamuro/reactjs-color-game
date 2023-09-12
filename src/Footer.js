import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useTheme } from "./GameContext";

function Footer() {
	const { themeIsDark } = useTheme();
	return (
		<Container>
			<footer
				class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
				style={{ width: "100%" }}
			>
				<Col md={4} class="d-flex align-items-center">
					<span
						class="mb-3 mb-md-0"
						style={{ color: themeIsDark ? "#FFFFFF" : "#000000" }}
					>
						© Marco Garcia Muro
					</span>
				</Col>

				<ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li class="ms-3">
						<a
							href="https://www.linkedin.com/in/marco-garcia-muro/"
							target="_blank"
							rel="noreferrer"
						>
							<svg class="bi" width="24" height="24">
								<FontAwesomeIcon
									style={{
										color: themeIsDark
											? "#FFFFFF"
											: "#000000",
									}}
									icon={faLinkedin}
								/>
							</svg>
						</a>
					</li>
					<li class="ms-3">
						<a
							href="https://github.com/marcogarciamuro"
							target="_blank"
							rel="noreferrer"
						>
							<svg class="bi" width="24" height="24">
								<FontAwesomeIcon
									style={{
										color: themeIsDark
											? "#FFFFFF"
											: "#000000",
									}}
									icon={faGithub}
								/>
							</svg>
						</a>
					</li>
				</ul>
			</footer>
		</Container>
	);
}

export default Footer;
