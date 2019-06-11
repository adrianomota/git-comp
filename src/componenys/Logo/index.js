import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../CompareList';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
    loading: false,
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      this.setState({ repositoryInput: '' });

      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: [...repositories, repository],
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
