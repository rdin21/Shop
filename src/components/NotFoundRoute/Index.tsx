import React from "react";
import { Link } from "react-router-dom";
import s from "./NotFoundRoute.module.scss";

function Index(): JSX.Element {
  return (
    <div className={s.not_found_page}>
      <div className="container">
        <div className={s.not_found_page_message}>
          <div>
            <div className={s.not_found_page_message_status}>404</div>
            <p className={s.not_found_page_message_msg}>
              Not found route{" "}
              <Link to="/" className={s.not_found_page_message_msg_link}>
                на главную
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
