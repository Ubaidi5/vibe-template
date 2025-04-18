/**
 * Newsletter Email Template
 * Example of a newsletter email template with our framework
 */

// Import components is handled automatically by the transformer

/**
 * NewsletterTemplate component
 * Creates a newsletter email with articles and updates
 * @param {Object} props - Template props
 * @param {string} props.userName - User's name
 * @param {string} props.companyName - Company name
 * @param {Array} props.articles - List of articles
 * @returns {Email} - Email component
 */
const NewsletterTemplate = (props) => {
    const {
        userName = 'Subscriber',
        companyName = 'Our Company',
        articles = [
            {
                title: 'Article 1',
                summary: 'This is a summary of the first article',
                imageUrl: 'https://via.placeholder.com/300x200',
                linkUrl: '#'
            },
            {
                title: 'Article 2',
                summary: 'This is a summary of the second article',
                imageUrl: 'https://via.placeholder.com/300x200',
                linkUrl: '#'
            }
        ]
    } = props;

    return (
        <Email
            title={`${companyName} Newsletter`}
            previewText={`${companyName} Newsletter - Latest Updates`}
            backgroundColor="#f5f5f5"
        >
            {/* Header */}
            <Row style={{ backgroundColor: '#ffffff', padding: '20px 0' }}>
                <Column>
                    <Text size="24px" weight="bold" align="center" color="#333333">
                        {companyName} Newsletter
                    </Text>
                </Column>
            </Row>

            {/* Greeting */}
            <Row style={{ backgroundColor: '#ffffff', padding: '20px', marginTop: '10px' }}>
                <Column>
                    <Text>
                        Hello {userName},
                    </Text>
                    <Text style={{ marginTop: '10px' }}>
                        Welcome to our latest newsletter. Here are some updates we think you'll find interesting:
                    </Text>
                </Column>
            </Row>

            {/* Articles */}
            {articles.map((article, index) => (
                <Row key={index} style={{ backgroundColor: '#ffffff', padding: '20px', marginTop: '10px' }}>
                    <Column span={8} sm={24}>
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            width="100%"
                            style={{ maxWidth: '300px' }}
                        />
                    </Column>
                    <Column span={16} sm={24} style={{ padding: '0 20px' }}>
                        <Text size="18px" weight="bold" color="#333333">
                            {article.title}
                        </Text>
                        <Text style={{ marginTop: '10px' }}>
                            {article.summary}
                        </Text>
                        <Text style={{ marginTop: '10px', color: '#0066cc' }}>
                            <a href={article.linkUrl} style={{ color: '#0066cc', textDecoration: 'none' }}>
                                Read more →
                            </a>
                        </Text>
                    </Column>
                </Row>
            ))}

            {/* Footer */}
            <Row style={{ backgroundColor: '#333333', padding: '20px', marginTop: '10px', color: '#ffffff' }}>
                <Column>
                    <Text align="center" color="#ffffff" size="14px">
                        © {new Date().getFullYear()} {companyName}. All rights reserved.
                    </Text>
                    <Text align="center" color="#ffffff" size="14px" style={{ marginTop: '10px' }}>
                        <a href="#" style={{ color: '#ffffff', textDecoration: 'underline' }}>Unsubscribe</a> |
                        <a href="#" style={{ color: '#ffffff', textDecoration: 'underline' }}> View in Browser</a>
                    </Text>
                </Column>
            </Row>
        </Email>
    );
};

// Export the template
export default NewsletterTemplate; 