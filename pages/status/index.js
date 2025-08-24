import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

const styles = {
  dataStyle: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5c5c5cff",
    fontFamily: "fantasy",
  },
  databaseContainer: {
    padding: 10,
    background: "#ededed",
    borderRadius: 10,
    fontFamily: "fantasy",
    fontSize: 14,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#5c5c5cff",
  },
  statusContainer: {
    fontFamily: "monospace",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: "500",
    color: "#114300ff",
    backgroundColor: "#91ff6d80",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
  },
};

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <h1 style={styles.statusContainer}>
        Status: <span style={styles.statusBadge}>online</span>
      </h1>
      <UpdatedAt data={data} />
      <DatabaseStatus data={data} isLoading={isLoading} />
    </>
  );
}

function UpdatedAt({ data }) {
  const updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

  return (
    <>
      <p style={styles.titleStyle}>
        Última atualização:{" "}
        <span style={styles.dataStyle}>{updatedAtText}</span>
      </p>
    </>
  );
}

function DatabaseStatus({ data, isLoading }) {
  let databaseStatusInformation;

  if (!isLoading && data) {
    databaseStatusInformation = (
      <div style={styles.databaseContainer}>
        <p style={styles.titleStyle}>
          Banco de dados:{" "}
          <span style={styles.dataStyle}>
            {data.dependencies.database.postgres_version}
          </span>
        </p>
        <p style={styles.titleStyle}>
          Conexões máximas:
          <span style={styles.dataStyle}>
            {" "}
            {data.dependencies.database.max_connections}
          </span>
        </p>
        <p style={styles.titleStyle}>
          Conexões abertas:
          <span style={styles.dataStyle}>
            {" "}
            {data.dependencies.database.opened_connections}
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ fontFamily: "monospace" }}>Database</h1>
      {databaseStatusInformation}
    </>
  );
}
