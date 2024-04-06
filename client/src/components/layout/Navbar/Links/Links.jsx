import { NavLink } from "react-router-dom";

const Links = ({ children, linksToRender}) => {

  return (
    <>
      <ul className="font-medium text-base flex flex-col items-center gap-4 md:gap-0 md:flex-row">
        {linksToRender.map((element, id) => {
          return (
            <li key={id}>
              <NavLink
                to={element.path}
                className='text-white flex items-center gap-1 text-[1rem] p-2 rounded transition-all duration-200 ease-in-out hover:text-black'
              > {element.icon}
                {element?.label}
              </NavLink>
            </li>
          );
        })}
        {children}
      </ul>
    </>
  );
};

export default Links;
