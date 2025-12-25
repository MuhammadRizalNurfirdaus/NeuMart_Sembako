-- Drop and recreate ai_logs table with correct schema
DROP TABLE IF EXISTS ai_logs CASCADE;

CREATE TABLE ai_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_type VARCHAR(50) NOT NULL,
  product_id INTEGER REFERENCES products(id),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_logs_user ON ai_logs(user_id);
CREATE INDEX idx_ai_logs_product ON ai_logs(product_id);
CREATE INDEX idx_ai_logs_event ON ai_logs(event_type);
CREATE INDEX idx_ai_logs_created ON ai_logs(created_at);
