import './Footer.css';

const CONTRIBUTORS = [
    {
      name: "Suchitra Mohan",
      gh: "https://github.com/suchimohan",
      linkd: "https://www.linkedin.com/in/suchitra-mohan/",
      email: "mailto:suchimohan91@gmail.com"
    }]

export default function Footer () {
  return (
    <footer>
      <div className="madeby">
        <a target="_blank" href="https://github.com/ily123/oney" rel="noreferrer">
          <i className="fab fa-github-square" />
        </a>
        Helperz was made by
      </div>
      <div className="contributors">
        {CONTRIBUTORS.map(person =>{
          return <PersonCard key={"persoon_"+person.name} person={person} />
        })}
      </div>
    </footer>
  );
}

function PersonCard ({ person }) {
  const { name, gh, linkd, email } = person;
  return (
    <div className="personCard">
      <div className='my-name'>
        { name }
      </div>
      <div className="socialMediaLinks">
        <a target="_blank" href={gh} rel="noreferrer">
          <i className="fab fa-github-square"/>
        </a>
        <a target="_blank" href={linkd} rel="noreferrer">
          <i className="fab fa-linkedin"/>
        </a>
        <a target="_blank" href={email} rel="noreferrer">
          <i className="fas fa-envelope-square"/>
        </a>
      </div>
    </div>
  )
}

