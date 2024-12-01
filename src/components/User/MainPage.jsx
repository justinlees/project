import React from "react";
import {
  useOutletContext,
  Link,
  Form,
  useSearchParams,
} from "react-router-dom";

export default function MainPage() {
  const userData = useOutletContext();
  const lancers = userData.freelancer ? userData.freelancer : userData;
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const filteredData = query
    ? lancers.filter(
        (item) =>
          item.UserName === query ||
          item.Skill.toLowerCase().replaceAll(" ", "") ===
            query.toLowerCase().replaceAll(" ", "")
      )
    : lancers;

  return (
    <div className="MainPage">
      <div className="searchBar">
        <Form>
          <fieldset>
            <input
              type="search"
              placeholder="Search skills"
              name="query"
              required
            />
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </fieldset>
        </Form>
      </div>

      <div className="freelancersDisplay">
        {filteredData.length ? (
          
          filteredData?.map((item) => (
            <div className="freelancerData">
              <div className="lancerDetails">
                <img alt="" />
                <h3>{item.UserName}</h3>
                <h3>{item.Rating}</h3>
                <h3>{item.Skill}</h3>
              </div>
              <Link to={`${item.UserName}/requestPage`}>
                view profile &rarr;
              </Link>
            </div>
          ))
        ) : (
          <div className="lancerDetails">
            No details Found
            <br />
            Please recheck the entered search key
          </div>
        )}
      </div>
    </div>
  );
}
