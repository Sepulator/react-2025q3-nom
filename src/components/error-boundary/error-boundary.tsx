import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const styles: React.CSSProperties = {
  margin: '0 auto',
  marginTop: '8rem',
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    const { error, errorInfo, hasError } = this.state;

    return hasError ? (
      <main style={styles}>
        <h1>Something went wrong.</h1>
        <details>
          {error && error.toString()}
          <br />
          {errorInfo?.componentStack}
        </details>
        <button onClick={this.handleReload}>Window reload</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
