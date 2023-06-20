import Image from "next/image";
import Link from "next/link";
import classroom from "public/classroom.jpg";
import meeting from "public/meeting.jpg";
import learn from "public/learn.jpg";
import logo from "public/flourish.svg";
import { Crimson_Text } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faLock,
  faBriefcase,
  faChildren,
} from "@fortawesome/free-solid-svg-icons";
import { faHandshake, faClock } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const About = () => {
  return (
    <>
      <header className="flex justify-between items-center gap-4 p-4 h-20 bg-sky-800 text-slate-50 shadow-slate-900/50 shadow-md sm:p-8 lg:py-8 lg:px-10 2xl:px-72">
        <a href="#" className="flex item-center gap-3">
          <Image src={logo} alt="" width={25} className="mb-1" />
          <h1 className={`text-2xl font-semibold ${crimsonText.className}`}>
            Flourish Education
          </h1>
        </a>
        <nav className="flex align-center justify-center gap-2">
          <ul className="flex align-center justify-center gap-2 border-r-2 border-r-sky-700">
            <Link href="#" className="rounded-md hover:bg-sky-700 px-5 py-1">
              Features
            </Link>
            <Link href="#" className="rounded-md hover:bg-sky-700 px-5 py-1">
              Resources
            </Link>
            <Link href="#" className="rounded-md hover:bg-sky-700 px-5 py-1">
              About
            </Link>
          </ul>
          <ul className="flex align-center justify-center gap-2">
            <Link
              href="/auth/sign-up"
              className="rounded-md hover:bg-sky-700 px-5 py-1">
              Register
            </Link>
            <Link href="/auth/sign-in" className="btn-primary px-5 py-1">
              Sign In
            </Link>
          </ul>
        </nav>
      </header>
      <section className="text-slate-900 py-6 px-12 shadow-slate-900/50 shadow-md sm:p-8 lg:py-10 lg:px-32 2xl:px-72">
        <h1 className="text-3xl font-bold mb-6 leading-[2.75rem] text-center mx-auto max-w-[400px] lg:text-4xl lg:mb-8 lg:leading-[3rem]">
          Organise your lessons, all in one place
        </h1>
        <div className="flex flex-col justify-around items-center gap-8 text-center md:flex-row lg:gap-16">
          <div>
            <Image src={classroom} alt="" className="mb-4" />
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
              exercitationem veniam quisquam debitis corporis, deleniti ad sint
              est.
            </p>
          </div>
          <div>
            <Image src={learn} alt="" className="mb-4" />
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
              exercitationem veniam quisquam debitis corporis, deleniti ad sint
              est.
            </p>
          </div>
          <div>
            <Image src={meeting} alt="" className="mb-4" />
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
              exercitationem veniam quisquam debitis corporis, deleniti ad sint
              est.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-sky-200 text-slate-900 py-6 px-12 sm:p-8 lg:py-10 lg:px-32 2xl:px-72">
        <h1 className="text-3xl font-bold mb-6 leading-[2.75rem] text-center mx-auto max-w-[400px] lg:text-4xl lg:mb-8 lg:leading-[3rem]">
          Trusted by schools all over the UK
        </h1>
        <div className="mb-8">
          <p className="italic text-xl mb-3">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-lg text-right">
            -- Headteacher at Grange Hill School
          </p>
        </div>
        <div className="mb-8">
          <p className="italic text-xl mb-3">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-lg text-right">
            -- Assistant Head Academic at Frinden House Prep
          </p>
        </div>
        <div className="mb-8">
          <p className="italic text-xl mb-3">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-lg text-right">
            -- Senior Leader at Elmcroft School
          </p>
        </div>
      </section>
      <section className="text-slate-900 py-6 px-12 shadow-slate-900/50 shadow-md sm:p-8 lg:py-10 lg:px-32 2xl:px-72">
        <h1 className="text-3xl font-bold mb-6 leading-[2.75rem] text-center mx-auto max-w-[400px] lg:text-4xl lg:mb-8 lg:leading-[3rem]">
          Features to speed up your planning
        </h1>
        <div className="text-center md:flex-row lg:gap-16 md:grid md:grid-cols-2 md:gap-8">
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faSchool}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#e89e8c",
              }}
            />
            <h2 className="text-lg font-semibold">Teacher designed</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faLock}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#c7c983",
              }}
            />
            <h2 className="text-lg font-semibold">Secured data</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faHandshake}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#83c98f",
              }}
            />
            <h2 className="text-lg font-semibold">Collaboration</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faClock}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#83b4c9",
              }}
            />
            <h2 className="text-lg font-semibold">Future proof</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faBriefcase}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#c2a2e2",
              }}
            />
            <h2 className="text-lg font-semibold">Inspection ready</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="justify-self-center mb-4">
            <FontAwesomeIcon
              icon={faChildren}
              style={{
                height: "60px",
                marginInline: "auto",
                marginBottom: "15px",
                color: "#d39cb9",
              }}
            />
            <h2 className="text-lg font-semibold">Child focussed</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-around gap-8 bg-sky-200 text-slate-900 py-6 px-12 sm:p-8 md:flex-row lg:py-10 lg:px-32 2xl:px-72">
        <nav>
          <p className="font-bold mb-6">Features</p>
          <ul>
            <li className="mb-3">
              <a href="#">How It Works</a>
            </li>
            <li className="mb-3">
              <a href="#">Inspection</a>
            </li>
            <li className="mb-3">
              <a href="#">Pricing</a>
            </li>
            <li className="mb-3">
              <a href="#">Templates</a>
            </li>
          </ul>
        </nav>
        <nav>
          <p className="font-bold mb-6">Resources</p>
          <ul>
            <li className="mb-3">
              <a href="#">Help Center</a>
            </li>
            <li className="mb-3">
              <a href="#">Productivity</a>
            </li>
            <li className="mb-3">
              <a href="#">Developer API</a>
            </li>
            <li className="mb-3">
              <a href="#">Feedback</a>
            </li>
          </ul>
        </nav>
        <nav>
          <p className="font-bold mb-6">About Us</p>
          <ul>
            <li className="mb-3">
              <a href="#">Company</a>
            </li>
            <li className="mb-3">
              <a href="#">Press</a>
            </li>
          </ul>
        </nav>
      </section>
      <footer className="flex flex-start gap-5 bg-sky-800 text-slate-50 shadow-slate-900/50 py-2 px-6 shadow-md lg:px-32 2xl:px-72">
        <p className="text-xs">
          <a href="https://github.com/ShubsMastan">Security</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="https://github.com/ShubsMastan">Privacy</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="https://github.com/ShubsMastan">Terms</a>
        </p>
        <p className="text-xs">
          &copy; <a href="https://github.com/ShubsMastan">ShubsMastan</a>
        </p>
        <a href="https://github.com/ShubsMastan">
          <FontAwesomeIcon icon={faGithub} style={{ width: "15px" }} />
        </a>
      </footer>
    </>
  );
};

export default About;
