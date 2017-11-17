import PropTypes from 'prop-types'
import { Link, NavLink, withRouter, Switch, Route } from 'react-router-dom'
import { Icon } from 'shared/components/elements'
//TODO: move MenuItem into groups as well
import classes from './style.scss'

//hoverType:
//  noHover turns off changes on hover altogether
//  textOnly only changes the font color on hover
const MenuItem = ({ text, children, icon, link, nav, onClick, location, badge, hoverType, exact = false }) => {
  let content = (
    <div>
      {badge && <span className={classes.badge}>{badge}</span>}
      {icon && <Icon name={icon} className={classes.icon} />}
      &nbsp;&nbsp;&nbsp;{text}
    </div>
  )

  return (
    <li className={`${classes.menuItem} `} onClick={onClick}>
      {link && nav &&
        <NavLink to={link} exact={exact} activeClassName={`${classes.navActive} ${hoverType ? classes[hoverType] : ""}`}>
          {content}
        </NavLink>
      }
      {link && !nav &&
        <Link to={link} className={`${hoverType ? classes[hoverType] : ""}`}>
          {content}
        </Link>
      }
      {!link &&
        content
      }
      {location.pathname.includes(link) && children}
    </li>
  )
}

MenuItem.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string,
  nav: PropTypes.bool,
}

export default withRouter(MenuItem)
