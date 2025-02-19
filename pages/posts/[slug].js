/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import fs from "fs";
import matter from "gray-matter";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";

import Layout from "../../layouts/LayoutDocs";
import MainContent from "../../components/common/main-content/MainContent";
import Toc from "../../components/common/pg-toc/Toc";
import { highlight } from "../../utils/highlighter";

String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

export async function getStaticPaths() {
    // Retrieve all our slugs
    const files = fs.readdirSync('_posts');
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {

    const fileName = fs.readFileSync(`_posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    let codes = await highlight(content);

    return {
        props: {
            frontmatter,
            content,
            codes,
            slug
        },
    };
}

export default function PostPage({ frontmatter, content, codes, slug }) {

    // Show page toc
    const [showToc, setShowToc] = React.useState(false);

    const handleToc = (data) => {
        setShowToc(data)
    }

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content={frontmatter.abstract}
                />
                <meta
                    name="keywords"
                    content="ballerinalang, integration, microservices, programming language, cloud native, ballerina language"
                />

                <title>{frontmatter.title}</title>

                {/* <!--FB--> */}
                <meta property="og:type" content="article" />
                <meta
                    property="og:title"
                    content={`Ballerina - ${frontmatter.title}`}
                />
                <meta
                    property="og:description"
                    content={frontmatter.abstract}
                />
                <meta property="og:image" content={`https://blog.ballerina.io/blog-images/${frontmatter.socialmediaimage}`} />

                {/* <!--LINKED IN  --> */}
                <meta property="og:title" content={`Ballerina - ${frontmatter.title}`} />
                <meta property="og:image" content={`https://blog.ballerina.io/blog-images/${frontmatter.socialmediaimage}`} />

                {/* <!--TWITTER--> */}
                <meta name="twitter:title" content={`Ballerina - ${frontmatter.title}`} />
                <meta
                    property="twitter:description"
                    content={frontmatter.abstract}
                />
                <meta
                    property="twitter:text:description"
                    content={frontmatter.abstract}
                />
                <meta name="twitter:image" content={`https://blog.ballerina.io/blog-images/${frontmatter.socialmediaimage}`} />
                <meta property="twitter:image" content={`https://blog.ballerina.io/blog-images/${frontmatter.socialmediaimage}`} />
            </Head>
            <Layout>
                <Col sm={12} md={3} xxl={2} className="leftNav d-none d-md-block">
                    <Link href="/" passHref>
                        <div className="backToBlogs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="#3ad1ca"
                                className="bi bi-box-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                            </svg>
                            <p className="m-0 p-0">Back to Blogs</p>
                        </div>
                    </Link>
                </Col>

                <Col xs={12} className="d-block d-md-none">
                    <Link href="/" passHref>
                        <div className="backToBlogs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="#3ad1ca"
                                className="bi bi-box-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                            </svg>
                            <p className="m-0 p-0">Back to Blogs</p>
                        </div>
                    </Link>
                </Col>

                <Col xs={12} md={7} xxl={7} className="mdContent">
                    <Container>
                        <div className="topRow">
                            <Col xs={12}>
                                <h1>{frontmatter.title}</h1>
                                <p className="dateAuth"><span className='blogAuthor'>{frontmatter.author}</span><br />{frontmatter[`published-date`]}</p>
                            </Col>
                        </div>


                        <MainContent
                            content={content}
                            handleToc={handleToc}
                            codes={codes} />

                    </Container>
                </Col>
                <Col md={2} xxl={3} className="pageToc d-none d-md-block">
                    {showToc ? (
                        <>
                            <h6>On this page</h6>
                            <Toc source={content} />
                        </>
                    ) : null}
                </Col>
            </Layout>
        </>
    );
}
