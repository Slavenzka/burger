import React, { Component } from 'react'
import Input from 'components/UI/Input/Input'
import Button from 'components/UI/Button/Button'
import css from './Auth.module.scss'
import { auth, setAuthRedirectPath } from 'store/actions'
import { connect } from 'react-redux'
import Spinner from 'components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { checkValidity, updateObject } from 'shared/utility'

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    // We are in signup mode initially
    isSignup: true
  }

  componentDidMount = () => {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    })
    this.setState({
      controls: updatedControls
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  render () {
    const formElementsArray = Object.keys(this.state.controls).map((item, index) => {
      return {
        config: { ...this.state.controls[item] },
        id: item
      }
    })

    const form = this.props.isLoading
      ? <Spinner />
      : formElementsArray.map(formElement => {
          return (
            <Input
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={evt => this.inputChangedHandler(evt, formElement.id)}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              fieldType={formElement.id}
              key={formElement.id}
            />
          )
        })

    const errorMessage = this.props.error
      ? <p>{this.props.error.message}</p>
      : null

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={css.authForm}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            btnType='Success'
          >
            SUBMIT
          </Button>
          <Button
            btnType='Danger'
            clicked={this.switchAuthModeHandler}
          >
            SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
