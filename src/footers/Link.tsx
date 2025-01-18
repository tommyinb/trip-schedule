import "./Link.css";

export function Link() {
  return (
    <div className="footers-Link">
      <a className="link" href={location.href}>
        Trip Schedule
      </a>{" "}
      by{" "}
      <a className="link" href="https://github.com/tommyinb/trip-schedule">
        Tommy
      </a>
    </div>
  );
}
