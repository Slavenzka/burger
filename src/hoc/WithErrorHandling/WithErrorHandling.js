import React from 'react'
import Auxiliary from 'hoc/Auxiliary/Auxiliary'
import Modal from 'components/UI/Modal/Modal'

const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends React.Component {
    constructor (props) {
      super(props)
      // Засовываем обработчик ошибок в конструктор, чтобы он выводил ошибку на самом раннем
      // этаме жизненного цикла, а не ждал рендера детей, приводя к бесконечному ожиданию в
      // случае отсутствия ответа сервера. Аналогом конструктору мог бы быть componentWillMount,
      // но его скоро уберут
      this.handleErrors = () => {
        this.reqInterceptor = axios.interceptors.request.use(req => {
          this.setState({ error: null })
          return req
        })
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
          this.setState({ error: error })
          return Promise.reject(error)
        })
      }
      this.handleErrors()
    }

    componentWillUnmount () {
      // Чтобы не допустить утечек памяти (исполнения лишнего кода) при многократном
      // использовании компонента WithErrorHandling необходимо отключать "старые" (созданные в
      // предыдущих инстансах класса) interceptors
      // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor)
      // axios.interceptors.elect(this.reqInterceptor)
      // axios.interceptors.elect(this.resInterceptor)
    }

    state = {
      error: null
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render () {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
}

export default WithErrorHandler
