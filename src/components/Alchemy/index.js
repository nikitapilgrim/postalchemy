import React, {Suspense, useMemo, useEffect, useRef, useState} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import logo from './assets/logobig.png';

import logoSmall from './assets/logosmall.png';
import {Link, Route, useLocation} from "wouter";
import {BlockMover} from "../Book/pages/BlockMover";
import {ComplexCollege} from "../Book/pages/ComplexCollege.js";
import {DonutLab} from "../Book/pages/DonutLab.js";
import {PrimeWorld} from "../Book/pages/PrimeWorld.js";
import {RestaurantMobile} from "../Book/pages/RestaurantMobile.js";
import {SeclusionPhysics} from "../Book/pages/SeclusionPhysics.js";
import {TheWalkingFishes} from "../Book/pages/TheWalkingFishes.js";
import {VideoCourse} from "../Book/pages/VideoCourse.js";
import {YoutubeContext} from "../Book/components/Youtube";
import {Team} from "../Book/pages/Team";
import {Contact} from "../Book/pages/Contact";
import fullsiteimg from "./assets/checkoutfullversion.jpg";

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #16161a;
  overflow-y: scroll;
  scroll-behavior: smooth;
  pointer-events: auto;
`;


const Logo = styled.a`
  width: 5rem;
  display: block;
  padding: 1rem;
  img {
    display:inline-block;
    max-width: 100%;
  }
`;

const AboutUs = styled.p`
  color: ${props => props.theme.t || ``};
  padding: 0 1rem;
  font-size: 0.6rem;
  img {
    display: inline-block;
     max-width: 100%;
     margin: 0.5rem 0;
  }
`;

const ProjectsLinks = styled.div`
  background-color:#1f1f23;
  padding: 1rem;
  padding-top: .5rem;

`;

const Project = styled.div`
  padding: 0 1rem;


`;


const ProjectLabel = styled.div`
    a {     
        padding: 0.5rem 0;
        width: 100%;
        height: 100%;
        display: inline-block;
        text-decoration: none;
        color: ${props => props.theme.t || ``};
    }
`;
const ProjectWrapper = styled.div`
   max-width: 100%;
   padding: 1rem 0;
   & > div {
      & > div {
                padding: 0;
        }
   }
`;


const ProjectTitle = styled.h2`
    color: ${props => props.theme.p || ``};
`;

const Contacts = styled(ProjectTitle)`
  margin-top: 0;
`;

const RenderPages = (pages) => () => {
    return (
        <ProjectWrapper>
            {pages && pages.map(Page => <Page/>)}
        </ProjectWrapper>
    );
};

const mobileTheme = {
    p: "#bbb",
    t: "#fffffe",
    l: "#3fc5ff"
};


const GlobalStyle = createGlobalStyle`
  html { 
      font-size: 24px;
   }
   .slick-slider {
      margin-bottom: 1.5rem;
   }
   .slick-dots {
    bottom: -1.5rem !important;
   }
  
  .slick-dots button::before {
    opacity: .2 !important;
    color: #bbb !important;
  }
  .slick-active {
     button {
        &:before {
          opacity: .9 !important;
          color: #bbb !important;
        }
     }
  }
`;


const PojectsWithRoutes = React.memo(function MyComponent({projects}) {
    return (
        <>
            {projects.map(project => {
                return (
                    <Route path={`/project/${project.name.split(' ').join('_')}`}
                           component={RenderPages(project.pages)}
                    />
                );
            })}
        </>
    )
});

export const Alchemy = () => {
    const ref = useRef(null);
    const [projectsData] = useState([
        {name: 'Block Mover', pages: BlockMover},
        {name: 'Complex College Solution', pages: ComplexCollege},
        {name: 'Donut Lab', pages: DonutLab},
        {name: 'Prime World', pages: PrimeWorld},
        {name: 'Restaurant Mobile App', pages: RestaurantMobile},
        {name: 'Seclusion Physics', pages: SeclusionPhysics},
        {name: 'The Walking Fishes', pages: TheWalkingFishes},
        {name: 'GameDev Video Course', pages: VideoCourse},
        {name: 'About Team', pages: Team},
    ]);

    const [location, setLocation] = useLocation();
    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollIntoView(true);
        }
    }, [location, ref]);


    return (
        <ThemeProvider theme={mobileTheme}>
            <YoutubeContext.Provider value={false}>
                <GlobalStyle/>
                <Wrapper>
                    <Link href={`/`}>
                        <Logo>
                            <img src={logoSmall} alt="logo"/>
                        </Logo>
                    </Link>

                    <AboutUs>
                        The lab to create urbanism for the modern Web, Applications, Games, etc.
                        <img src={fullsiteimg} alt="Desktop site"/>
                        <br/>
                        Checkout our full website on Desktop
                    </AboutUs>
                    <Project ref={ref}>
                        <PojectsWithRoutes projects={projectsData}/>
                    </Project>
                    <ProjectsLinks>
                        <ProjectTitle>Projects</ProjectTitle>
                        {projectsData.map(project => <ProjectLabel>
                            <Link href={`/project/${project.name.split(' ').join('_')}`}>
                                <a className="link">{project.name}</a>
                            </Link>
                        </ProjectLabel>)}
                    </ProjectsLinks>
                    <ProjectsLinks>
                        <Contacts>Contact</Contacts>
                        <Contact/>
                    </ProjectsLinks>
                </Wrapper>
            </YoutubeContext.Provider>
        </ThemeProvider>
    );
};
