"use client";

import Image from "next/image";
import Link from "next/link";
import classroom from "public/classroom.jpg";
import meeting from "public/meeting.jpg";
import learn from "public/learn.jpg";
import logo from "public/flourish.svg";
import { signIn } from "next-auth/react";
import { ysabeau } from "@/libs/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faLock,
  faBriefcase,
  faChildren,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHandshake, faClock } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className="relative flex h-20 items-center justify-between gap-4 bg-sky-800 p-4
        text-slate-50 shadow-md shadow-slate-900/50 sm:p-8 lg:px-10 lg:py-8 2xl:px-72">
        <a href="#" className="item-center flex gap-3">
          <Image src={logo} alt="" style={{ width: "25px", height: "auto" }} />
          <h1 className={`text-2xl font-semibold ${ysabeau.className}`}>
            Flourish Education
          </h1>
        </a>
        <button
          className="relative lg:hidden"
          onClick={() => {
            setIsMenuOpen((prevState) => !prevState);
          }}>
          <FontAwesomeIcon
            icon={faXmark}
            size="2xl"
            className={`${
              isMenuOpen ? "opacity-0" : "opacity-1"
            } absolute -top-4 right-0 transition-opacity duration-500`}
          />
          <FontAwesomeIcon
            icon={faBars}
            size="xl"
            className={`${
              isMenuOpen ? "opacity-1" : "opacity-0"
            } absolute -top-3 right-0 transition-opacity duration-500`}
          />
        </button>
        <nav className="align-center hidden justify-center gap-2 lg:flex">
          <ul className="align-center flex justify-center gap-2 border-r-2 border-r-sky-700">
            <Link href="#" className="rounded-md px-5 py-1 hover:bg-sky-700">
              Features
            </Link>
            <Link href="#" className="rounded-md px-5 py-1 hover:bg-sky-700">
              Resources
            </Link>
            <Link href="#" className="rounded-md px-5 py-1 hover:bg-sky-700">
              About
            </Link>
          </ul>
          <ul className="align-center flex justify-center gap-2">
            <Link
              href="/auth/sign-up"
              className="rounded-md px-5 py-1 hover:bg-sky-700">
              Register
            </Link>
            <button
              onClick={() => {
                signIn();
              }}
              className="btn-primary px-5 py-1">
              Sign In
            </button>
          </ul>
        </nav>
        <nav
          className={`${
            isMenuOpen ? "scale-y-0" : "scale-y-1"
          } absolute right-0 top-16 flex w-full origin-top flex-col
          justify-center gap-2 rounded-md bg-sky-800 p-5
          transition-transform duration-500 lg:hidden`}>
          <ul
            className={`${
              isMenuOpen
                ? "opacity-0 duration-200"
                : "opacity-1 delay-300 duration-500"
            } align-center flex flex-col justify-center gap-2 transition-opacity`}>
            <Link href="#" className="rounded-md px-5 py-1 hover:bg-sky-700">
              Features
            </Link>
            <Link href="#" className="rounded-md px-5 py-1 hover:bg-sky-700">
              Resources
            </Link>
            <Link
              href="#"
              className="mr-3 rounded-md px-5 py-1 hover:bg-sky-700">
              About
            </Link>
          </ul>
          <ul
            className={`${
              isMenuOpen
                ? "opacity-0 duration-200"
                : "opacity-1 delay-300 duration-500"
            } align-center flex flex-col justify-center gap-2 transition-opacity
            lg:flex-row lg:border-r-2 lg:border-r-sky-700`}>
            <Link
              href="/auth/sign-up"
              className="rounded-md px-5 py-1 hover:bg-sky-700">
              Register
            </Link>
            <button
              onClick={() => {
                signIn();
              }}
              className="btn-primary px-5 py-1">
              Sign In
            </button>
          </ul>
        </nav>
      </header>
      <section className="px-12 py-6 text-slate-900 shadow-md shadow-slate-900/50 sm:p-8 lg:px-32 lg:py-10 2xl:px-72">
        <h1 className="mx-auto mb-6 max-w-[400px] text-center text-3xl font-bold leading-[2.75rem] lg:mb-8 lg:text-4xl lg:leading-[3rem]">
          Organise your lessons, all in one place
        </h1>
        <div className="flex flex-col items-center justify-around gap-8 text-center md:flex-row lg:gap-16">
          <div>
            <Image priority={false} src={classroom} alt="" className="mb-4" />
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
      <section className="bg-sky-200 px-12 py-6 text-slate-900 sm:p-8 lg:px-32 lg:py-10 2xl:px-72">
        <h1 className="mx-auto mb-6 max-w-[400px] text-center text-3xl font-bold leading-[2.75rem] lg:mb-8 lg:text-4xl lg:leading-[3rem]">
          Trusted by schools all over the UK
        </h1>
        <div className="mb-8">
          <p className="mb-3 text-xl italic">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-right text-lg">
            -- Headteacher at Grange Hill School
          </p>
        </div>
        <div className="mb-8">
          <p className="mb-3 text-xl italic">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-right text-lg">
            -- Assistant Head Academic at Frinden House Prep
          </p>
        </div>
        <div className="mb-8">
          <p className="mb-3 text-xl italic">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores itaque accusantium fugit. Fugiat obcaecati soluta dolorum,
            exercitationem veniam quisquam debitis corporis, deleniti ad sint
            est.&quot;
          </p>
          <p className="text-right text-lg">
            -- Senior Leader at Elmcroft School
          </p>
        </div>
      </section>
      <section className="px-12 py-6 text-slate-900 shadow-md shadow-slate-900/50 sm:p-8 lg:px-32 lg:py-10 2xl:px-72">
        <h1 className="mx-auto mb-6 max-w-[400px] text-center text-3xl font-bold leading-[2.75rem] lg:mb-8 lg:text-4xl lg:leading-[3rem]">
          Features to speed up your planning
        </h1>
        <div className="text-center md:grid md:grid-cols-2 md:flex-row md:gap-8 lg:gap-16">
          <div className="mb-4 justify-self-center">
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
          <div className="mb-4 justify-self-center">
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
          <div className="mb-4 justify-self-center">
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
          <div className="mb-4 justify-self-center">
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
          <div className="mb-4 justify-self-center">
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
          <div className="mb-4 justify-self-center">
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
      <section className="flex flex-col justify-around gap-8 bg-sky-200 px-12 py-6 text-slate-900 sm:p-8 md:flex-row lg:px-32 lg:py-10 2xl:px-72">
        <nav>
          <p className="mb-6 font-bold">Features</p>
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
          <p className="mb-6 font-bold">Resources</p>
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
          <p className="mb-6 font-bold">About Us</p>
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
      <footer className="flex-start flex gap-5 bg-sky-800 px-6 py-2 text-slate-50 shadow-md shadow-slate-900/50 lg:px-32 2xl:px-72">
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
