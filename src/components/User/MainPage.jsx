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
  const [anime, setAnime] = React.useState("freelancerData");

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
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </fieldset>
        </Form>
      </div>

      <div className="freelancersDisplay">
        <div className="row">
          {filteredData.length ? (
            filteredData?.map((item) => (
              <div className={anime}>
                <div className="inner-freelancerData">
                  <div className="lancerDetails">
                    <div>
                      <img alt="" />
                    </div>
                    <div>
                      <h3>{item.UserName}</h3>
                      <h3>{item.Rating}</h3>
                      <h3>{item.Skill}</h3>
                      <Link to={`${item.UserName}/requestPage`}>
                        view profile &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "grey",
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setAnime("freelancerDataModify");
                  }}
                >
                  &gt;
                </div>
              </div>
            ))
          ) : (
            <div className="lancerDetails">No details Found</div>
          )}
          <div className="freelancerData">
            <div className="lancerDetails">
              <h3>&rarr;</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
